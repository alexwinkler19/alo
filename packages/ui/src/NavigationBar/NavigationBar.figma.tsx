// Auto-generated from Figma
// This file is kept for reference and comparison with the implemented version
// Node ID: 812:9757

const img = "http://localhost:3845/assets/a05a9485bdd741c2a1835fd26764b4d104b9d657.svg";
const img1 = "http://localhost:3845/assets/401e2d22600d7065b78119eff91448ca9f74ed74.svg";
const img2 = "http://localhost:3845/assets/7babad6f9b289310738f1e66cbac97021d3155d1.svg";
const img3 = "http://localhost:3845/assets/c36a2bac7ac408488a8f0d277e2945f13936f138.svg";
const img4 = "http://localhost:3845/assets/5dfb9e0dddc54cc2e2adb511c0001cc2f7f239fc.svg";
const img5 = "http://localhost:3845/assets/a9e9a5b450ab6d0f2efda0b1f3c619be4c93587b.svg";
const img6 = "http://localhost:3845/assets/dc9647e94fb249287d00beb91cf0d3eb8dbe583c.svg";
const img7 = "http://localhost:3845/assets/3d37e283201e2b27680232efca48453bb94ed292.svg";
const img8 = "http://localhost:3845/assets/e36601b1cb5f0432108fa47e75a9f3200240c41d.svg";
const img9 = "http://localhost:3845/assets/d6226eeeb2c27cf6af66d56f42a04b283cd970bc.svg";
const img10 = "http://localhost:3845/assets/e4654894de24a09d408e80e75cc486b114c79eb4.svg";
const img11 = "http://localhost:3845/assets/02942cae3af1001d9fd0444fb2c8c926c065f02c.svg";

export default function NavigationBar({ state = "Explore" }: { state?: "Explore" | "Wishlist" | "Trips" | "Inbox" | "Profile" }) {
  const isInbox = state === "Inbox";
  const isProfile = state === "Profile";
  const isTrips = state === "Trips";
  const isWishlist = state === "Wishlist";
  const isWishlistOrInboxOrProfile = ["Wishlist", "Inbox", "Profile"].includes(state);
  const isWishlistOrTripsOrInboxOrProfile = ["Wishlist", "Trips", "Inbox", "Profile"].includes(state);
  return (
    <div className="bg-white border-[var(--semantic\/color\/border\/subtle,#eee)] border-solid border-t content-stretch flex flex-col items-start relative" id={isProfile ? "node-812_9830" : isInbox ? "node-812_9806" : isTrips ? "node-812_9782" : isWishlist ? "node-812_9758" : "node-812_9756"}>
      <div className="bg-[var(--semantic\/color\/bg\/primary,white)] content-stretch flex items-start justify-between px-[24px] py-[12px] relative shrink-0 w-[375px]" data-name="Menu" id={isProfile ? "node-812_9831" : isInbox ? "node-812_9807" : isTrips ? "node-812_9783" : isWishlist ? "node-812_9759" : "node-807_721"}>
        {/* 5 Menu items with different states... */}
      </div>
      <div className="bg-[var(--semantic\/color\/bg\/primary,white)] h-[21px] relative shrink-0 w-[375px]" data-name="Home Indicator" id={isProfile ? "node-812_9837" : isInbox ? "node-812_9813" : isTrips ? "node-812_9789" : isWishlist ? "node-812_9765" : "node-812_9736"}>
        <div className="absolute bottom-[8px] flex h-[5px] items-center justify-center left-1/2 translate-x-[-50%] w-[139px]">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <div className="bg-[var(--primitive\/color\/black,black)] h-[5px] rounded-[100px] w-[139px]" data-name="Home Indicator" id={isProfile ? "node-I812_9837-811_7062" : isInbox ? "node-I812_9813-811_7062" : isTrips ? "node-I812_9789-811_7062" : isWishlist ? "node-I812_9765-811_7062" : "node-I812_9736-811_7062"} />
          </div>
        </div>
      </div>
    </div>
  );
}
