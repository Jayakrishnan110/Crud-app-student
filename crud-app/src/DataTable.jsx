import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './DataTable.css';

const DataTable = ({ students }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Date of Birth</TableCell>
          <TableCell>Grade</TableCell>
          <TableCell>Gender</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell>{student.firstName}</TableCell>
            <TableCell>{student.lastName}</TableCell>
            <TableCell>{student.dob.toLocaleDateString()}</TableCell>
            <TableCell>{student.grade}</TableCell>
            <TableCell>{student.gender}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;