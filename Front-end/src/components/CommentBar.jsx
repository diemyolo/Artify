import React from 'react'
import SinglePostComment from './SinglePostComment'
import login from "../assets/login.jpg";
import InputComment from './InputComment';

const CommentBar = ({ postId }) => {

    return (

        <div className="flex flex-col items-start justify-between w-full h-full ">
            <div className='flex flex-col items-start gap-10 mb-2'>
                <h1 className="text-lg font-semibold text-[#2f6a81]">
                    Comments (20)
                </h1>
                <div className="flex flex-col w-full gap-8 overflow-y-scroll pr-8" style={{ maxHeight: '300px' }}>
                    <SinglePostComment
                        billyGreenOne={login}
                        timezone="Awesome Edward, remeber that five tips for low cost "
                        image=""
                        imageOne=""
                        className="flex flex-row justify-center w-full"
                    />
                    <SinglePostComment
                        billyGreenOne={login}
                        timezone="Awesome Edward, remeber that five tips for low cost "
                        image=""
                        imageOne=""
                        className="flex flex-row justify-center w-full"
                    />
                      <SinglePostComment
                        billyGreenOne={login}
                        timezone="Awesome Edward, remeber that five tips for low cost "
                        image=""
                        imageOne=""
                        className="flex flex-row justify-center w-full"
                    />
                      <SinglePostComment
                        billyGreenOne={login}
                        timezone="Awesome Edward, remeber that five tips for low cost "
                        image=""
                        imageOne=""
                        className="flex flex-row justify-center w-full"
                    />
                </div>
            </div>
            <div className='flex flex-col justify-end w-full'>
                <InputComment postId={postId}/>
            </div>
        </div>

    )
}

export default CommentBar