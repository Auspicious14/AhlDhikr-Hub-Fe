const testimonials = [
  {
    quote: "AhlDhikr Hub has been a game-changer for my Islamic studies. The answers are clear, concise, and always backed by authentic sources. It's an invaluable resource for any Muslim seeking knowledge.",
    author: "Fatima Ahmed",
    role: "Student of Knowledge",
    avatar: "/avatars/avatar-1.svg",
  },
  {
    quote: "As a new Muslim, I had so many questions. This platform gave me trustworthy answers without the confusion of searching through conflicting websites. Masha'Allah, a wonderful initiative.",
    author: "David (Dawud) Miller",
    role: "Recent Convert",
    avatar: "/avatars/avatar-2.svg",
  },
  {
    quote: "Finally, a reliable and easy-to-use tool for quick Islamic referencing. I use it for preparing sermons and for my own personal learning. Highly recommended for imams and community leaders.",
    author: "Imam Yusuf Ali",
    role: "Community Imam",
    avatar: "/avatars/avatar-3.svg",
  },
];

const TestimonialCard = ({ quote, author, role, avatar }: { quote: string; author: string; role: string; avatar: string }) => (
  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-card p-8 h-full flex flex-col">
    <p className="text-beige-100/80 italic text-lg flex-grow">"{quote}"</p>
    <div className="flex items-center mt-6">
      <img src={avatar} alt={author} className="w-12 h-12 rounded-full object-cover border-2 border-gold-500" />
      <div className="ml-4">
        <p className="font-bold font-heading text-gold-500 text-xl">{author}</p>
        <p className="text-sm text-beige-100/60">{role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-heading text-beige-100">What Our Users Say</h2>
          <p className="mt-4 text-lg text-beige-100/80 max-w-2xl mx-auto">Trusted by a growing community of knowledge seekers.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
