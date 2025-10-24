import { SlidingLogoMarqueeItem } from "@/components/lightswind/sliding-logo-marquee";
import Image from "next/image";

export const logos: SlidingLogoMarqueeItem[] = [
    {
      id: "1",
  content: <Image src="/icon/Java.png" alt="Java" width={80} height={80} className="h-20 w-auto" />
    },
    {
      id: "2",
  content: <Image src="/icon/Python.png" alt="Python" width={80} height={80} className="h-20 w-auto" />
    },
    {
      id: "3",
  content: <Image src="/icon/JavaScript.png" alt="JavaScript" width={80} height={80} className="h-20 w-auto" />
    },
    {
      id: "4",
  content: <Image src="/icon/Git.png" alt="Git" width={80} height={80} className="h-20 w-auto" />
    },
    {
      id: "5",
  content: <Image src="/icon/Next.js.png" alt="Next.js" width={80} height={80} className="h-20 w-auto" />
    },
    {
      id: "6",
  content: <Image src="/icon/React.png" alt="React" width={80} height={80} className="h-20 w-auto" />
    },
    {
      id: "7",
  content: <Image src="/icon/TypeScript.png" alt="TypeScript" width={80} height={80} className="h-20 w-auto" />
    },
    {
      id: "8",
  content: <Image src="/icon/SQL.png" alt="SQL" width={80} height={80} className="h-20 w-auto" />
    },
  ]
