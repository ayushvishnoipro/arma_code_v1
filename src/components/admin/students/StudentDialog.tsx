import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Student } from "@/types/student";

interface StudentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: Student) => void;
  student?: Student;
  mode: 'add' | 'edit';
}

export const StudentDialog = ({ isOpen, onClose, onSubmit, student, mode }: StudentDialogProps) => {
  const [formData, setFormData] = useState<Student>(
    student || {
      name: "",
      roll_number: "",
      email: "",
      gender: "M",
      year_of_study: 1,
      stream: "Natural Sciences"
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Student' : 'Edit Student'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          {/* Add more form fields for other student properties */}
          
          <Button type="submit">
            {mode === 'add' ? 'Add Student' : 'Save Changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};