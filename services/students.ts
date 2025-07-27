import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import type { Student } from "@/lib/types";

export function useStudentList({
	page,
	limit,
	searchTerm,
	filterStatus,
	filterClass,
}: {
	page: number;
	limit: number;
	searchTerm: string;
	filterStatus: string;
	filterClass: string;
}) {
	return useQuery({
		queryKey: [
			"students",
			{ page, limit, searchTerm, filterStatus, filterClass },
		],
		queryFn: async () => {
			const response = await axios.get("/api/admin/student/list", {
				params: { page, limit, searchTerm, filterStatus, filterClass },
			});
			return response.data as { students: Student[]; totalPages: number };
		},
	});
}

export function usePromoteStudent() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			studentId: string;
			className: string;
			year: number;
			rollNumber: number;
		}) => {
			const response = await axios.post("/api/admin/students/promote", data);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["students"] });
			toast.success("Student promoted successfully.");
		},
		onError: (error) => {
			toast.error(
				error.message || "Failed to promote student. Please try again.",
			);
		},
	});
}

export function useUpdateStudent(studentId: string) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: Partial<Student>) => {
			const response = await axios.put(
				`/api/admin/student?id=${studentId}`,
				data,
			);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["students"] });
			queryClient.invalidateQueries({ queryKey: ["student", studentId] });
			toast.success("Student updated successfully.");
		},
		onError: (error) => {
			toast.error(
				error.message || "Failed to update student. Please try again.",
			);
		},
	});
}

export function useDeleteStudent() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (studentId: string) => {
			const response = await axios.delete(`/api/admin/student?id=${studentId}`);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["students"] });
			toast.success("Student deleted successfully.");
		},
		onError: (error) => {
			toast.error(
				error.message || "Failed to delete student. Please try again.",
			);
		},
	});
}
export function useCreateStudent() {
	const { mutate, isPending } = useMutation({
		mutationFn: async (formData: FormData) => {
			const res = await axios.post("/api/admin/student", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return res.data;
		},
	});

	return { mutate, isPending };
}

export function useSingleStudent({ id }: { id: string }) {
	return useQuery({
		queryKey: ["single-student", id],
		queryFn: async () => {
			const response = await axios.get(
				`/api/admin/student/list/single-student?id=${id}`,
			);
			return response.data;
		},
	});
}
