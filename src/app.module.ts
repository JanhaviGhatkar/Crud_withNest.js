import { Module } from '@nestjs/common';
import { SchoolModule } from './school/school.module';



@Module({
  imports: [SchoolModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
