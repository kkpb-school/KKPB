import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";

interface ActionsBarProps {
	isSubmitting: boolean;
	handleSubmit: () => void;
}

export const ActionsBar = ({ isSubmitting, handleSubmit }: ActionsBarProps) => (
	<Card className="shadow-sm">
		<CardContent className="p-4">
			<div className="flex flex-col justify-center gap-3 sm:flex-row">
				<Button
					onClick={handleSubmit}
					disabled={isSubmitting}
					className="h-10 bg-green-600 hover:bg-green-700"
				>
					{isSubmitting ? (
						<>
							<div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
							Saving...
						</>
					) : (
						<>
							<Save className="mr-2 h-4 w-4" />
							Save Results
						</>
					)}
				</Button>
			</div>
		</CardContent>
	</Card>
);
