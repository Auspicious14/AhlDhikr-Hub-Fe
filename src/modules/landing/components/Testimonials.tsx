import { Card } from '@/components/Card';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "AhlDhikr Hub has been a game-changer for my Islamic studies. The answers are clear, concise, and always backed by authentic sources. It's an invaluable resource for any Muslim seeking knowledge.",
      author: "Fatima Ahmed",
      role: "Student of Knowledge",
    },
    {
      quote: "As a new Muslim, I had so many questions. This platform gave me trustworthy answers without the confusion of searching through conflicting websites. Masha'Allah, a wonderful initiative.",
      author: "David (Dawud) Miller",
      role: "Recent Convert",
    },
    {
      quote: "Finally, a reliable and easy-to-use tool for quick Islamic referencing. I use it for preparing sermons and for my own personal learning. Highly recommended for imams and community leaders.",
      author: "Imam Yusuf Ali",
      role: "Community Imam",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center font-heading">What Our Users Say</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <p className="mt-4 font-bold font-heading text-emerald-700">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
