// Auto-generated from Figma
// This file is kept for reference and comparison with the implemented version
// Node ID: 2722:60944

const img1 = "http://localhost:3845/assets/4ed64a865d74f7f8a5c97f6063771f925d8af9f1.png";
const img2 = "http://localhost:3845/assets/bdf1829ed7e5efe631b19ca9b5bfa613b1bd93c9.png";
const img3 = "http://localhost:3845/assets/ec5d725f673f117870257c5966d751050bb582e7.png";
const img = "http://localhost:3845/assets/46ad404879a615c98010f5a1983310805f17b1bf.svg";
const imgAddStory = "http://localhost:3845/assets/932e1c667c5cae197e25ebb733b58017f2043a15.svg";

export default function UserStory({ storyType = "Normal" }: { storyType?: "Normal" | "Mine" | "Live" }) {
  const isLive = storyType === "Live";
  const isMine = storyType === "Mine";
  const isNormalOrLive = ["Normal", "Live"].includes(storyType);
  return (
    <div className="h-[72.9px] relative w-[57.6px]" id={isMine ? "node-2722_60959" : isLive ? "node-2722_60952" : "node-2722_60945"}>
      {isNormalOrLive && (
        <div className="absolute inset-[0_0_20.99%_0]" data-name="Gradient" id={isLive ? "node-2722_60953" : "node-2722_60946"}>
          <img alt="" className="block max-w-none size-full" src={img} />
        </div>
      )}
      <div className="absolute inset-[4.94%_6.25%_25.93%_6.25%]" data-name="ProfilePic" id={isMine ? "node-2722_60961" : isLive ? "node-2722_60954" : "node-2722_60947"}>
        <img alt="" className="block max-w-none size-full" height="50.4" src={isMine ? img1 : isLive ? img2 : img3} width="50.4" />
      </div>
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal inset-[90.4%_4.17%_-2.74%_2.08%] justify-center leading-[0] not-italic text-[11px] text-black text-center tracking-[-0.1485px]" id={isMine ? "node-2722_60965" : isLive ? "node-2722_60958" : "node-2722_60951"}>
        <p className="css-ew64yg leading-[9px]">Your Story</p>
      </div>
      {isLive && (
        <div className="absolute inset-[66.67%_31.25%_16.05%_31.25%]" data-name="Live" data-node-id="2722:60955">
          <div className="absolute border-[0.9px] border-solid border-white inset-0 rounded-[0.9px]" data-name="Rectangle" data-node-id="2722:60956" style={{ backgroundImage: "linear-gradient(122.093deg, rgb(199, 5, 154) 6.4891%, rgb(221, 14, 68) 118.9%)" }} />
          <div className="absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold inset-[14.29%_16.67%_21.43%_16.67%] justify-center leading-[0] not-italic text-[6.3px] text-center text-white tracking-[-0.1485px]" data-node-id="2722:60957">
            <p className="css-4hzbpn leading-[16.2px]">LIVE</p>
          </div>
        </div>
      )}
      {isMine && (
        <div className="absolute inset-[45.54%_-2.43%_16.05%_53.82%]" data-name="AddStory" data-node-id="2722:60966">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(49, 130, 206, 1)", "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <img alt="" className="block max-w-none size-full" src={imgAddStory} />
          </div>
        </div>
      )}
    </div>
  );
}
