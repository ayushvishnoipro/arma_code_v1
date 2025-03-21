import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StudentDialog } from './StudentDialog';
import { Student } from '@/types/student';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import studentsData from '@/data/student.json';

export const StudentsTab = () => {
  const [students, setStudents] = useState<Student[]>(studentsData as Student[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [filterStream, setFilterStream] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | undefined>();
  const [deleteStudent, setDeleteStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.roll_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear === 'all' || student.year_of_study.toString() === filterYear;
    const matchesStream = filterStream === 'all' || student.stream === filterStream;
    return matchesSearch && matchesYear && matchesStream;
  });

  const handleAddStudent = (student: Student) => {
    setStudents([...students, student]);
    toast({
      title: "Success",
      description: "Student added successfully",
    });
  };

  const handleEditStudent = (student: Student) => {
    setStudents(students.map(s => s.roll_number === student.roll_number ? student : s));
    setEditingStudent(undefined);
    toast({
      title: "Success",
      description: "Student updated successfully",
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteStudent) {
      setStudents(students.filter(s => s.roll_number !== deleteStudent.roll_number));
      setDeleteStudent(null);
      toast({
        title: "Success",
        description: "Student deleted successfully",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Student Management</h2>
        <Button onClick={() => setDialogOpen(true)}>Add New Student</Button>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search by name or roll number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        
        <select 
          value={filterYear} 
          onChange={(e) => setFilterYear(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All Years</option>
          {[1,2,3,4,5].map(year => (
            <option key={year} value={year}>{`Year ${year}`}</option>
          ))}
        </select>

        <select 
          value={filterStream} 
          onChange={(e) => setFilterStream(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All Streams</option>
          <option value="Natural Sciences">Natural Sciences</option>
          <option value="Engineering Sciences">Engineering Sciences</option>
          <option value="Economic Sciences">Economic Sciences</option>
        </select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Roll Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Stream</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.roll_number}>
              <TableCell>{student.roll_number}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.year_of_study}</TableCell>
              <TableCell>{student.stream}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditingStudent(student)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => setDeleteStudent(student)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <StudentDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleAddStudent}
        mode="add"
      />

      {editingStudent && (
        <StudentDialog
          isOpen={!!editingStudent}
          onClose={() => setEditingStudent(undefined)}
          onSubmit={handleEditStudent}
          student={editingStudent}
          mode="edit"
        />
      )}

      <AlertDialog open={!!deleteStudent} onOpenChange={() => setDeleteStudent(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Student</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deleteStudent?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteStudent(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};