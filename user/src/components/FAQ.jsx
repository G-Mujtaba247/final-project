
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "When is the best time to visit?",
      answer:
        "Summer months from June to September offer clear skies and comfortable temperatures. Spring and autumn bring mild weather and fewer crowds. Winter transforms the mountains into a snow-covered landscape for those seeking solitude.",
    },
    {
      question: "What’s included in the tour price?",
      answer:
        "Each tour includes accommodation, guided services, and most meals. Transportation from major cities and entrance fees to attractions are covered. Some tours offer optional activities at additional cost.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Cancellations made 14 days before departure receive a full refund. Cancellations within 14 days are subject to a 25 percent fee. We recommend travel insurance for added protection.",
    },
    {
      question: "Do you offer group discounts?",
      answer:
        "Groups of 8 or more receive a 10 percent discount on tour prices. Corporate and educational groups may qualify for additional savings. Contact us directly to arrange your group booking.",
    },
    {
      question: "What about travel insurance?",
      answer:
        "We recommend purchasing travel insurance before your trip. Coverage should include medical emergencies and trip cancellation. Our team can provide recommendations based on your needs.",
    },
  ];

  return (
    <>
    <section className="w-full max-w-4xl mt-10 mx-auto py-16 px-4">
      {/* Main Heading */}
      <h2 className="text-4xl font-bold text-center">Questions?</h2>
      <p className="text-center text-gray-600 mt-3">
        Find answers to common questions about our tours and booking process.
      </p>

      {/* Accordion FAQ */}
      <Accordion type="single" collapsible className="mt-12 space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="border-b border-gray-300 pb-4"
          >
            <AccordionTrigger className="text-left text-lg font-semibold">
              {faq.question}
            </AccordionTrigger>

            <AccordionContent className="text-gray-700 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Need More Help Section */}
      <div className="text-center mt-16 position-static">
        <h3 className="text-2xl font-bold">Need more help?</h3>
        <p className="text-gray-600 mt-2">
          Reach out to our team for any questions not answered here.
        </p>

        <button className="mt-6 px-6 py-2 border border-black rounded-full hover:bg-green-700 hover:border hover:text-white hover:border-green-700 transition-colors">
          Contact
        </button>
      </div>
    </section>
    </>
  );
}
