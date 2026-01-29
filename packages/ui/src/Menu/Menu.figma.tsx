// Auto-generated from Figma
// This file is kept for reference and comparison with the implemented version
// Node ID: 812:9429

const imgVector = "http://localhost:3845/assets/00e7d3a817b385618d94df026634aa1476fc0430.svg";
const img = "http://localhost:3845/assets/401e2d22600d7065b78119eff91448ca9f74ed74.svg";
const imgIndicators = "http://localhost:3845/assets/7babad6f9b289310738f1e66cbac97021d3155d1.svg";
const img1 = "http://localhost:3845/assets/a05a9485bdd741c2a1835fd26764b4d104b9d657.svg";

type MenuProps = {
  active?: boolean;
  icon?: React.ReactNode | null;
  showIndicators?: boolean;
  text?: string;
};

export default function Menu({ active = true, icon = null, showIndicators = true, text = "Label" }: MenuProps) {
  const isActive = active;
  const isNotActive = !active;
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative" id={isNotActive ? "node-812_9427" : "node-812_9428"}>
      {isActive &&
        (icon || (
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/Search" data-node-id="812:9422">
            <div className="absolute inset-[12.5%_8.33%_8.33%_12.5%]" data-name="Vector" data-node-id="I812:9422;984:7932">
              <div className="absolute inset-[-5.26%_-3.72%_-3.72%_-5.26%]" style={{ "--stroke-0": "rgba(193, 57, 105, 1)" } as React.CSSProperties}>
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
            </div>
          </div>
        ))}
      {isActive && (
        <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--semantic\/color\/interface\/brand,#c13969)]" data-node-id="812:9417">
          {text}
        </p>
      )}
      {showIndicators && (
        <div className="absolute left-[40.5px] size-[8px] top-[-2px]" data-name="Indicators" data-node-id="868:7224">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(193, 57, 105, 1)" } as React.CSSProperties}>
            <img alt="" className="block max-w-none size-full" src={imgIndicators} />
          </div>
        </div>
      )}
      {isNotActive &&
        (icon || (
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Outline/Search" data-node-id="812:9424">
            <div className="absolute inset-[12.5%_8.33%_8.33%_12.5%]" data-name="Vector" data-node-id="I812:9424;984:7932">
              <div className="absolute inset-[-5.26%_-3.72%_-3.72%_-5.26%]" style={{ "--stroke-0": "rgba(44, 44, 44, 1)" } as React.CSSProperties}>
                <img alt="" className="block max-w-none size-full" src={img1} />
              </div>
            </div>
          </div>
        ))}
      {isNotActive && (
        <p className="css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--semantic\/color\/text\/primary,#2c2c2c)]" data-node-id="812:9421">
          {text}
        </p>
      )}
    </div>
  );
}
