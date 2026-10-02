"use client";
import { useEffect, useId, useRef, useState } from "react";
import UiIcon from "./UiIcon";
import { useLanguage } from "./Language";
const choices = [{value:"collaboration",label:"Kolaborasi Proyek"},{value:"opportunity",label:"Peluang Kerja"},{value:"question",label:"Pertanyaan Umum"}];
export default function SubjectSelect() {
  const { t } = useLanguage();
  const [value,setValue] = useState(0);
  const [open,setOpen] = useState(false);
  const [active,setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const options = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  useEffect(()=>{
    const reset=()=>{setValue(0);setOpen(false);};
    const form=root.current?.closest("form"); form?.addEventListener("reset",reset);
    return ()=>form?.removeEventListener("reset",reset);
  },[]);
  useEffect(()=>{
    if (!open) return;
    options.current[active]?.focus();
    const outside=(event:PointerEvent)=>{if (!root.current?.contains(event.target as Node)) setOpen(false);};
    document.addEventListener("pointerdown",outside);
    return ()=>document.removeEventListener("pointerdown",outside);
  },[open,active]);
  return <div ref={root} className="relative mt-2" onBlur={event=>{if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);}}>
    <input type="hidden" name="subject" value={choices[value].value}/>
    <button ref={trigger} id="contact-subject" type="button" aria-labelledby="contact-subject-label contact-subject-value" aria-haspopup="listbox" aria-expanded={open} aria-controls={id} className="simple-field flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-foreground/15 px-4 py-3.5 text-left text-base font-normal sm:text-sm" onClick={()=>{setActive(value);setOpen(!open);}} onKeyDown={event=>{if (["ArrowDown","ArrowUp","Home","End"].includes(event.key)){event.preventDefault();setActive(event.key==="Home"?0:event.key==="End"?2:value);setOpen(true);}}}>
      <span id="contact-subject-value">{t(choices[value].label)}</span><UiIcon name="chevron" className={"size-4 shrink-0 text-muted transition-transform " +(open?"rotate-180":"")}/>
    </button>
    {open && <div id={id} role="listbox" aria-labelledby="contact-subject-label" className="absolute top-full right-0 left-0 z-20 mt-2 rounded-xl border border-foreground/15 bg-background p-1.5 shadow-xl" onKeyDown={event=>{
      if(event.key==="Escape"){event.preventDefault();event.stopPropagation();setOpen(false);trigger.current?.focus();}
      else if(["ArrowDown","ArrowUp","Home","End"].includes(event.key)){event.preventDefault();setActive(event.key==="Home"?0:event.key==="End"?2:(active+(event.key==="ArrowDown"?1:2))%3);}
      else if(event.key.length===1 && event.key!==" "){const match=choices.findIndex(choice=>t(choice.label).toLowerCase().startsWith(event.key.toLowerCase()));if(match>=0){event.preventDefault();setActive(match);}}
    }}>{choices.map((choice,index)=><button ref={element=>{options.current[index]=element;}} key={choice.value} type="button" role="option" aria-selected={index===value} tabIndex={index===active?0:-1} onFocus={()=>setActive(index)} onClick={()=>{setValue(index);setOpen(false);trigger.current?.focus();}} className="subject-option flex min-h-11 w-full cursor-pointer items-center justify-between rounded-lg px-3 text-left text-sm font-normal">{t(choice.label)}{index===value && <span aria-hidden="true">✓</span>}</button>)}</div>}
  </div>;
}
