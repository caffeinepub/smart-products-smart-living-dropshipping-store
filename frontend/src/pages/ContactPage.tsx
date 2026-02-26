import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Partial<ContactForm> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
  };

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">Contact Us</h1>
        <p className="text-muted-foreground">We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          {[
            { icon: Mail, title: 'Email', value: 'support@helpinghand.store', sub: 'We reply within 24 hours' },
            { icon: Phone, title: 'Phone', value: '+1 (800) 123-4567', sub: 'Mon–Fri, 9am–6pm EST' },
            { icon: MapPin, title: 'Address', value: '123 Commerce Street', sub: 'San Francisco, CA 94105' },
            { icon: Clock, title: 'Business Hours', value: 'Mon–Fri: 9am–6pm', sub: 'Sat: 10am–4pm EST' },
          ].map(({ icon: Icon, title, value, sub }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-5 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{title}</p>
                <p className="text-sm text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-8">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Message Sent!</h2>
              <p className="text-muted-foreground">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                className="mt-6 text-primary hover:underline text-sm font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Your Name *" value={form.name} onChange={(v) => handleChange('name', v)} error={errors.name} placeholder="John Doe" />
                <Field label="Email Address *" type="email" value={form.email} onChange={(v) => handleChange('email', v)} error={errors.email} placeholder="john@example.com" />
              </div>
              <Field label="Subject *" value={form.subject} onChange={(v) => handleChange('subject', v)} error={errors.subject} placeholder="How can we help?" />
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Message *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  className={`w-full px-3 py-2.5 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none ${errors.message ? 'border-destructive' : 'border-border'}`}
                />
                {errors.message && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <><span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />Sending...</> : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full h-10 px-3 text-sm rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 ${error ? 'border-destructive' : 'border-border'}`}
      />
      {error && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  );
}
