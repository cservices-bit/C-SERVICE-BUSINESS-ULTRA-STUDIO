import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarIcon, Send } from 'lucide-react';
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  service: z.string().min(1, "Veuillez sélectionner un service"),
  date: z.date({
    required_error: "Veuillez sélectionner une date souhaitée",
  }),
  message: z.string().min(10, "Veuillez décrire brièvement votre besoin"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Reservations() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    // Save to localStorage
    const savedMessages = localStorage.getItem('cservice_messages');
    const messages = savedMessages ? JSON.parse(savedMessages) : [];
    
    const newMessage = {
      id: Date.now().toString(),
      type: 'reservation',
      ...data,
      dateFormatted: format(data.date, "dd/MM/yyyy"),
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('cservice_messages', JSON.stringify([newMessage, ...messages]));
    
    // WhatsApp formatting
    const waMessage = `Bonjour C-SERVICE BUSINESS !%0A%0AJe m'appelle *${data.name}*.%0AJe souhaite réserver le service : *${data.service}*.%0ADate souhaitée : *${format(data.date, "dd/MM/yyyy")}*.%0AMon numéro : ${data.phone}%0A%0AMon projet :%0A${data.message}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Réservation enregistrée !",
        description: "Redirection vers WhatsApp pour finaliser...",
      });
      form.reset();
      window.open(`https://wa.me/243848681325?text=${waMessage}`, '_blank');
    }, 1000);
  }

  return (
    <section id="reservations" className="py-24 bg-card/5 border-y border-border/50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase inline-block relative">
            Réserver un Service
            <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          </h2>
          <p className="mt-8 text-muted-foreground">
            Parlez-moi de votre projet. Je vous recontacterai rapidement pour discuter des détails.
          </p>
        </div>

        <div className="glass p-8 rounded-2xl border-t-2 border-t-primary/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white uppercase tracking-wider text-xs font-bold">Nom complet</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean Dupont" className="bg-black/50 border-white/10 focus-visible:ring-primary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white uppercase tracking-wider text-xs font-bold">Téléphone / WhatsApp</FormLabel>
                      <FormControl>
                        <Input placeholder="+243..." className="bg-black/50 border-white/10 focus-visible:ring-primary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white uppercase tracking-wider text-xs font-bold">Service souhaité</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-black/50 border-white/10 focus:ring-primary">
                            <SelectValue placeholder="Sélectionner un service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="Tournage Vidéo">Tournage Vidéo</SelectItem>
                          <SelectItem value="Montage Professionnel">Montage Professionnel</SelectItem>
                          <SelectItem value="Live Streaming">Live Streaming</SelectItem>
                          <SelectItem value="Création TikTok/Reels">Création TikTok/Reels</SelectItem>
                          <SelectItem value="Publicité Business">Publicité Business</SelectItem>
                          <SelectItem value="Projection Église">Projection Église</SelectItem>
                          <SelectItem value="Autre projet">Autre projet</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-2">
                      <FormLabel className="text-white uppercase tracking-wider text-xs font-bold mb-1">Date souhaitée</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal bg-black/50 border-white/10 hover:bg-black/80 hover:text-white ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Choisir une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white uppercase tracking-wider text-xs font-bold">Détails du projet</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez votre vision, le lieu, la durée estimée..." 
                        className="bg-black/50 border-white/10 focus-visible:ring-primary min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest py-6"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    Traitement...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send size={18} />
                    Réserver maintenant
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
