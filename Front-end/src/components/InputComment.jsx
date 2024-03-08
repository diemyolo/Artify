import React, { useState } from 'react'
import { Avatar } from "flowbite-react";

const InputComment = () => {
    const [commentText, setCommentText] = useState('');

    return (
        <div className="flex mt-4 gap-3">
            <div>
                <Avatar />
            </div>
            <div className="grow rounded-lg border">
                <form>
                    <input
                        onChange={ev => setCommentText(ev.target.value)}
                        className="block w-full px-4 overflow-hidden h-10 rounded-lg" placeholder="Leave a comment..." />
                </form>
            </div>
        </div>)
}

export default InputComment