/**
 * v0 by Vercel.
 * @see https://v0.dev/t/P1RZRbmyi1k
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function Component() {
  return (
    <div className="flex flex-col h-[90vh] max-h-[90vh] w-full max-w-[600px] mx-auto bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden">
      <header className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            alt="Product Image"
            className="rounded-md"
            height={40}
            src="/placeholder.svg"
            style={{
              aspectRatio: "40/40",
              objectFit: "cover",
            }}
            width={40}
          />
          <div>
            <h2 className="text-lg font-semibold">Acme Wireless Headphones</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Product Info</p>
          </div>
        </div>
        <Button size="icon" variant="ghost">
          <XIcon className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage alt="Chatbot" />
            <AvatarFallback>CB</AvatarFallback>
          </Avatar>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[75%]">
            <p className="text-sm">Hello! I'm the Acme Wireless Headphones chatbot. How can I assist you today?</p>
          </div>
        </div>
        <div className="flex items-start gap-3 justify-end">
          <div className="bg-primary rounded-lg p-3 text-white max-w-[75%]">
            <p className="text-sm">Can you tell me more about the product specifications?</p>
          </div>
          <Avatar>
            <AvatarImage alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage alt="Chatbot" />
            <AvatarFallback>CB</AvatarFallback>
          </Avatar>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[75%]">
            <p className="text-sm">Absolutely! The Acme Wireless Headphones feature:</p>
            <ul className="list-disc pl-4 space-y-1 mt-2">
              <li>High-quality 40mm drivers for immersive sound</li>
              <li>Bluetooth 5.0 connectivity with a range of up to 30 feet</li>
              <li>Noise-cancelling microphone for clear calls</li>
              <li>Up to 20 hours of battery life on a single charge</li>
              <li>Comfortable, adjustable headband and earcups</li>
            </ul>
          </div>
        </div>
        <div className="flex items-start gap-3 justify-end">
          <div className="bg-primary rounded-lg p-3 text-white max-w-[75%]">
            <p className="text-sm">Great, that sounds really impressive. Are these headphones in stock right now?</p>
          </div>
          <Avatar>
            <AvatarImage alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage alt="Chatbot" />
            <AvatarFallback>CB</AvatarFallback>
          </Avatar>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[75%]">
            <p className="text-sm">
              Yes, the Acme Wireless Headphones are currently in stock and available for immediate shipping. We have a
              good supply on hand, so you can order them today and expect delivery within 2-3 business days.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 justify-end">
          <div className="bg-primary rounded-lg p-3 text-white max-w-[75%]">
            <p className="text-sm">
              Excellent, I'd like to place an order then. What's the price and how can I buy them?
            </p>
          </div>
          <Avatar>
            <AvatarImage alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage alt="Chatbot" />
            <AvatarFallback>CB</AvatarFallback>
          </Avatar>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[75%]">
            <p className="text-sm">
              The Acme Wireless Headphones are priced at $99.99. You can purchase them directly from our website at
              acme.com. Simply add them to your cart, enter your shipping and payment information, and we'll have them
              on their way to you.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Button size="sm">Buy Now</Button>
              <Link className="text-sm text-primary hover:underline" href="#">
                View Product Page
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 flex items-center gap-2">
        <Input className="flex-1" placeholder="Ask me anything about the product..." type="text" />
        <Button size="icon" variant="ghost">
          <SendIcon className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  )
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}