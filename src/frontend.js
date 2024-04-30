import React, { useState } from "react"
import ReactDOM from "react-dom"

const divsToUpdate = document.querySelectorAll(".boilerplate-update-me")

divsToUpdate.forEach(div => {
  const data = JSON.parse(div.querySelector("pre").innerText)
  ReactDOM.render(<OurComponent {...data} />, div)
  div.classList.remove("boilerplate-update-me")
})

function OurComponent(props) {
  const listbets = JSON.parse(props.lists);
  // console.log(listbets);
  console.log('front-end loaded');
  return (
    <>
      {listbets && listbets.map((item, index) =>
        <div className={`topnhacai-${index} my-3 relative`}>
          <div className={`bg-slate-300 absolute z-10 top-0 left-0 w-6 h-6 rounded-br-full text-sm font-bold overflow-hidden`}><span className="ml-1">{index + 1}</span></div>
          <div className={`bg-black rounded-md drop-shadow-lg p-2 text-white
          ${index === 0 && 'border-2 border-orange-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#f70,0_0_5px_#f70,0_0_12px_#f70]'}
          ${index === 1 && 'border-2 border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_5px_#08f,0_0_12px_#08f]'}
          ${index === 2 && 'border-2  border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_5px_#08f,0_0_12px_#08f]'}
          `}>
            <div className="flex justify-around">
              <div className="flex items-center space-x-2">
                <img src={item.logo} alt="" className="avatar w-20 h-20 rounded-full " />
                <div className="w-[150px]">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <span className="my-0">
                    <i class='bx bxs-star text-yellow-500 text-xs'></i>
                    <i class='bx bxs-star text-yellow-500 text-xs'></i>
                    <i class='bx bxs-star text-yellow-500 text-xs'></i>
                    <i class='bx bxs-star text-yellow-500 text-xs'></i>
                    <i class='bx bxs-star text-yellow-500 text-xs'></i>
                  </span>
                  <p className="text-sm">{item.slogan}</p>
                </div>
              </div>
              <div className="description flex flex-1 justify-center items-center text-center">
                <div>
                  <h2 className="text-yellow-500 text-lg font-bold">{item.giftTitle}</h2>
                  <p className="text-sm">{item.giftDesc}</p>
                </div>
              </div>
              <div className="relative flex justify-center items-center w-[160px]">
                <a href={item.link} className="w-full bg-[#c00] text-white font-bold text-center px-2 py-1 rounded-md hover:bg-yellow-500" target="_blank" rel="nofollow sponsored noopener">Truy cập {item.name}</a>
              </div>
            </div>
            <div className="mb-description flex flex-1 justify-center items-center text-center mt-1 border-t border-red-500">
              <div>
                <h2 className="text-yellow-500 text-lg font-bold">{item.giftTitle}</h2>
                <p className="text-sm">{item.giftDesc}</p>
              </div>
            </div>
          </div>
        </div>)}

    </>
  )
}
