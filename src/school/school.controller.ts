import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

type Students = {
  id: number;
  name: string;
  age: number;
};

@Controller('school')
export class SchoolController {
  //to store data
  private students: Students[] = [];

  @Get('allstudents')
  findAllStudents(): Students[] |string{
    if(this.students.length === 0){
        return "No student is there"
    }
    return this.students;
  }

  @Get('getStudentById/:id')
  findStudentById(@Param('id', ParseIntPipe) id: number): Students {
    const student = this.students.find(student => student.id === id);
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return student;
  }

  @Post('addNewStudent')
  createNewStudent(@Body() newStudent: Students): Students {
    const { id, name, age } = newStudent;
    const existingStudent = this.students.find((student) => student.id === id);
    if (existingStudent) {
      throw new HttpException(
        `The provided ID is already exist with Data ${existingStudent.name}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    this.students.push({ id, name, age });
    return this.students.find((student) => student.id === id);
  }

  @Put('updateStudent/:id')
  updateStudentById(
    @Param('id') id: number,
    @Body() updatedStudent: Students,
  ): Students {
    const { name, age } = updatedStudent;
    const index = this.students.findIndex((student) => student.id === id);
    if (index === -1) {
      throw new HttpException(
        `The provided ID ${id}is not exist `,
        HttpStatus.NOT_FOUND,
      );
    }
    this.students[index] = { ...this.students[index], name, age };
    return this.students[index];
  }

  @Delete("DeleteStudnetByID/:id")
  deleteStudentById(@Param("id") id:number):Students{
    const index = this.students.findIndex(student => student.id === id);
    // If the student doesn't exist, throw an exception
    if (index === -1) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    // Remove the student from the students array
    const deletedStudent = this.students.splice(index, 1)[0];
    return deletedStudent
  }
}
