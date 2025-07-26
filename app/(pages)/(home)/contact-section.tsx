import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export function ContactSection() {
	return (
		<section id="contact" className="py-16">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
					<div className="flex flex-col justify-center space-y-6">
						<div className="space-y-4">
							<Badge variant="outline">Get in Touch</Badge>
							<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
								Visit Our <span className="text-primary">Campus</span>
							</h2>
							<p className="text-muted-foreground text-lg leading-relaxed">
								We welcome you to visit our campus and experience the K.K.P.B
								difference. Schedule a tour or contact us for admissions
								information.
							</p>
						</div>
						<div className="flex flex-col gap-4 sm:flex-row">
							<Button size="lg" className="h-12">
								<Phone className="mr-2 h-5 w-5" />
								Call Us
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="h-12 bg-transparent"
							>
								<Mail className="mr-2 h-5 w-5" />
								Email Us
							</Button>
						</div>
					</div>
					<Card className="h-fit">
						<CardHeader>
							<CardTitle className="text-xl">Contact Information</CardTitle>
							<CardDescription>
								Reach out to us for any inquiries or to schedule a campus visit
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-start gap-3">
								<MapPin className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
								<span className="text-sm leading-relaxed">
									123 Education Street, Academic District, City - 123456
								</span>
							</div>
							<div className="flex items-center gap-3">
								<Phone className="text-primary h-5 w-5 flex-shrink-0" />
								<span className="text-sm">+91 98765 43210</span>
							</div>
							<div className="flex items-center gap-3">
								<Mail className="text-primary h-5 w-5 flex-shrink-0" />
								<span className="text-sm">info@kkpbschool.edu</span>
							</div>
							<div className="border-t pt-4">
								<h4 className="mb-3 font-semibold">Office Hours</h4>
								<div className="text-muted-foreground space-y-1 text-sm">
									<p>Monday - Friday: 8:00 AM - 4:00 PM</p>
									<p>Saturday: 9:00 AM - 1:00 PM</p>
									<p>Sunday: Closed</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
