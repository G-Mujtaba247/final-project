import React from "react";
export default function Reviews() {
  const reviews = [
    {
      stars: 4,
      text: `"The guides knew every trail and every story. We felt like locals, not tourists."`,
      name: "Ahmed Khan",
      role: "Adventurer, Karachi",
      img: "/legend.jpg",
    },
    {
      stars: 5,
      text: `"From booking to the final sunset in Swat, everything was seamless and unforgettable."`,
      name: "Ghulam Mujtaba",
      role: "Travel writer, Lahore",
      img: "/profile1.jpg",
    },
    {
      stars: 5,
      text: `"Worth every rupee. The mountains, the people, the food—all of it was real."`,
      name: "Hassan Ali",
      role: "Photographer, Islamabad",
      img: "/hassan.png",
    },
  ];

  return (
    <section className="w-full py-16 px-4 flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-center">Traveler stories</h2>
      <p className="text-gray-600 text-center mt-3">
        Hear from those who've explored Pakistan's most beautiful regions.
      </p>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-6xl">
        {reviews.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl p-6 shadow-sm bg-white"
          >
            {/* Stars */}
            <div className="flex mb-4">
              {"★".repeat(item.stars).split("").map((star, i) => (
                <span key={i} className="text-yellow-500 text-lg">★</span>
              ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-800 italic">{item.text}</p>

            {/* User */}
            <div className="flex items-center gap-3 mt-6">
              <img
                src={item.img}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
