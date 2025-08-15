import React from 'react'
import { CommandDialog,CommandEmpty,CommandInput, CommandList } from '@/components/ui/command';
import { Dispatch,SetStateAction } from 'react';
interface Props{
    open:boolean;
    setOpen:Dispatch<SetStateAction<boolean>>;
}
const DashBoardCommand = ({open,setOpen}:Props) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
            <CommandEmpty>
                <p>No results found.</p>
            </CommandEmpty>
        </CommandList>
    </CommandDialog>
  )
}

export default DashBoardCommand
