/**
 * @name Chat Input
 * @description ChatGPT-style input with auto-expand, attachments, voice, and action menu.
 * @usage
 * import { ChatInput } from "@/components/kit/chat-input"
 * import { Globe, Brush } from "lucide-react"
 * 
 * const [webSearch, setWebSearch] = useState(false)
 * 
 * <ChatInput
 *   menuItems={[
 *     { id: "web", label: "Web Search", icon: <Globe className="h-4 w-4" />, active: webSearch, onClick: () => setWebSearch(!webSearch) },
 *     { id: "canvas", label: "Canvas", icon: <Brush className="h-4 w-4" />, onClick: () => {} },
 *   ]}
 *   onSubmit={(data) => console.log(data.text, data.files, data.audio)}
 * />
 */
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Plus, SendHorizontal, Paperclip, Mic, X, Check } from "lucide-react";
import { useState, useRef, useCallback, KeyboardEvent, ChangeEvent } from "react";

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

interface ChatInputProps {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  menuItems?: MenuItem[];
  onSubmit?: (data: { text: string; files?: File[]; audio?: Blob }) => void;
}

export function ChatInput({
  className,
  placeholder = "Message...",
  disabled = false,
  menuItems = [],
  onSubmit,
}: ChatInputProps) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const cancelledRef = useRef(false);

  const handleSubmit = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed && files.length === 0 && !audioBlob) return;

    onSubmit?.({ 
      text: trimmed, 
      files: files.length > 0 ? files : undefined,
      audio: audioBlob || undefined,
    });
    
    setText("");
    setFiles([]);
    setAudioBlob(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }, [text, files, audioBlob, onSubmit]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startRecording = async () => {
    try {
      cancelledRef.current = false;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.3;
      source.connect(analyser);
      analyserRef.current = analyser;

      const updateLevels = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const levels = Array.from(dataArray.slice(0, 64)).map(v => v / 255);
        setAudioLevels(levels);
        animationRef.current = requestAnimationFrame(updateLevels);
      };
      updateLevels();

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        audioContext.close();
        if (!cancelledRef.current) {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          setAudioBlob(blob);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      setAudioLevels([]);
      analyserRef.current = null;
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      cancelledRef.current = true;
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      setAudioLevels([]);
      analyserRef.current = null;
    }
  };

  const removeAudio = () => {
    setAudioBlob(null);
  };

  const canSubmit = text.trim() || files.length > 0 || audioBlob;
  const iconBtnClass = "cursor-pointer text-muted-foreground hover:text-foreground";
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputWithExpand = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    const textarea = e.target;
    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;
    const newHeight = Math.min(scrollHeight, 200);
    textarea.style.height = `${newHeight}px`;
    
    if (!isExpanded && scrollHeight > 32) {
      setIsExpanded(true);
    } else if (isExpanded && newText.length === 0) {
      setIsExpanded(false);
    }
  }, [isExpanded]);

  const handleSubmitAndReset = useCallback(() => {
    handleSubmit();
    setIsExpanded(false);
  }, [handleSubmit]);

  const handleKeyDownWithReset = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitAndReset();
    }
  };

  const PlusMenu = menuItems.length > 0 ? (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled} className={cn("inline-flex items-center justify-center size-7 rounded-md hover:bg-muted data-popup-open:bg-muted transition-colors", iconBtnClass)}>
        <Plus className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[160px]">
        {menuItems.map((item) => (
          <DropdownMenuItem 
            key={item.id} 
            onClick={item.onClick} 
            className={cn(
              "cursor-pointer whitespace-nowrap",
              item.active && "bg-accent"
            )}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
            {item.active && <Check className="h-3 w-3 ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;

  const activeItems = menuItems.filter(item => item.active);
  const ModeBadges = activeItems.length > 0 ? (
    <div className="flex flex-wrap gap-1.5 mb-2">
      {activeItems.map(item => (
        <div 
          key={item.id} 
          className="flex items-center gap-1.5 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium"
        >
          {item.icon && <span className="[&>svg]:h-3 [&>svg]:w-3">{item.icon}</span>}
          <span>{item.label}</span>
          <button 
            type="button" 
            onClick={item.onClick} 
            className="hover:text-primary/70 cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  ) : null;

  const ActionButtons = (
    <>
      <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} disabled={disabled} />
      <Button variant="ghost" size="icon-sm" onClick={() => fileInputRef.current?.click()} disabled={disabled} className={iconBtnClass}>
        <Paperclip className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={startRecording}
        disabled={disabled}
        className={cn("cursor-pointer text-muted-foreground hover:text-foreground")}
      >
        <Mic className="h-4 w-4" />
      </Button>
      <Button variant="default" size="icon-sm" onClick={handleSubmitAndReset} disabled={disabled || !canSubmit} className="cursor-pointer">
        <SendHorizontal className="h-4 w-4" />
      </Button>
    </>
  );

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="rounded-2xl border border-border/50 bg-muted/50 px-4 py-3 transition-all duration-200 ease-out">
        {/* Mode badges */}
        {ModeBadges}

        {/* Attachments preview */}
        {(files.length > 0 || audioBlob) && (
          <div className="flex flex-wrap gap-2 mb-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md text-xs">
                <span className="max-w-[150px] truncate">{file.name}</span>
                <button type="button" onClick={() => removeFile(index)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {audioBlob && (
              <div className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md text-xs">
                <span>Voice recording</span>
                <button type="button" onClick={removeAudio} className="text-muted-foreground hover:text-foreground cursor-pointer">
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Textarea row or Recording UI */}
        {isRecording ? (
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center justify-between h-6 min-w-0">
              {(audioLevels.length > 0 ? audioLevels : Array(64).fill(0.08)).map((level, i) => (
                <div
                  key={i}
                  className="w-[2px] bg-blue-500 rounded-[1px]"
                  style={{ height: `${Math.max(2, level * 22)}px` }}
                />
              ))}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={cancelRecording}
                className="cursor-pointer text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                variant="default"
                size="icon-sm"
                onClick={stopRecording}
                className="cursor-pointer"
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {!isExpanded && <div className="shrink-0">{PlusMenu}</div>}
              
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleInputWithExpand}
                onKeyDown={handleKeyDownWithReset}
                placeholder={placeholder}
                disabled={disabled}
                rows={1}
                className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50 min-h-[24px] max-h-[200px] py-0.5"
              />
              
              {!isExpanded && (
                <div className="flex items-center gap-1 shrink-0">
                  {ActionButtons}
                </div>
              )}
            </div>

            {isExpanded && (
              <div className="flex items-center justify-between">
                <div>{PlusMenu}</div>
                <div className="flex items-center gap-1">{ActionButtons}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
