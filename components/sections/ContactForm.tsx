"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  type: z.enum(["Web Development", "AI Integration", "System Design", "Other"]),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      type: "Web Development",
      message: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    setIsError(false);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e717e385-94db-4b16-9360-ce537e5cc2e0",
          name: values.name,
          email: values.email,
          subject: `New Contact: ${values.type}`,
          message: values.message,
          from_name: "FirstVoid Website",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        form.reset();
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative z-10 bg-neutral-950 py-16 sm:py-20 lg:py-24 text-white overflow-hidden"
    >
      {/* Background Gradient Blob */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] bg-matrixo-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 lg:mb-16 border-b border-white/10 pb-6">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold">
            Get In Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
          {/* Left Column: Info */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            >
              Let&apos;s Build <br />
              <span className="text-matrixo-green">The Future.</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-neutral-400 text-sm sm:text-base mb-8 sm:mb-10 max-w-md leading-relaxed"
            >
              Ready to transform your digital presence? We partner with
              ambitious brands to create high-impact digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-5 sm:space-y-6"
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="p-2.5 rounded-lg bg-white/5 text-matrixo-purple">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">
                    Email Us
                  </h4>
                  <p className="text-neutral-400 text-sm">
                    chetan@firstvoid.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="p-2.5 rounded-lg bg-white/5 text-white">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">
                    Call Us
                  </h4>
                  <p className="text-neutral-400 text-sm">+91 9303135537</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-neutral-900/50 border border-white/10 rounded-xl p-5 sm:p-6 lg:p-8 backdrop-blur-sm"
          >
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 sm:py-16">
                <div className="w-14 h-14 bg-matrixo-green/20 text-matrixo-green rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-neutral-400 text-sm">
                  We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-sm text-white underline hover:text-matrixo-green"
                >
                  Send another message
                </button>
              </div>
            ) : isError ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 sm:py-16">
                <div className="w-14 h-14 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
                <p className="text-neutral-400 text-sm">
                  Please try again or email us directly.
                </p>
                <button
                  onClick={() => setIsError(false)}
                  className="mt-6 text-sm text-white underline hover:text-matrixo-green"
                >
                  Try again
                </button>
              </div>
            ) : (
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-5"
              >
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs sm:text-sm font-medium text-neutral-300"
                  >
                    Name
                  </label>
                  <input
                    {...form.register("name")}
                    className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-matrixo-purple focus:ring-1 focus:ring-matrixo-purple transition-colors"
                    placeholder="John Doe"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-xs">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs sm:text-sm font-medium text-neutral-300"
                  >
                    Email
                  </label>
                  <input
                    {...form.register("email")}
                    className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-matrixo-purple focus:ring-1 focus:ring-matrixo-purple transition-colors"
                    placeholder="john@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-xs">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="type"
                    className="text-xs sm:text-sm font-medium text-neutral-300"
                  >
                    Project Type
                  </label>
                  <div className="relative">
                    <select
                      {...form.register("type")}
                      className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-matrixo-purple focus:ring-1 focus:ring-matrixo-purple transition-colors appearance-none"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="AI Integration">AI Integration</option>
                      <option value="System Design">System Design</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1.5L6 6.5L11 1.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs sm:text-sm font-medium text-neutral-300"
                  >
                    Message
                  </label>
                  <textarea
                    {...form.register("message")}
                    rows={4}
                    className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-matrixo-purple focus:ring-1 focus:ring-matrixo-purple transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-500 text-xs">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
