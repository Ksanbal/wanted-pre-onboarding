import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobListDto } from './dtos/job-list.dto';
import { JobDto } from './dtos/job.dto';
import { JobService } from './job.service';

@ApiTags('job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  @ApiOperation({ summary: '채용공고 목록' })
  @ApiResponse({
    status: 200,
    type: JobListDto,
  })
  async getList(): Promise<JobListDto[]> {
    return this.jobService.getList();
  }

  @Get(':id')
  @ApiOperation({ summary: '채용공고 상세페이지' })
  @ApiResponse({
    status: 200,
    type: JobDto,
  })
  async get(@Param('id') id: number) {
    console.log(typeof id);
    return this.jobService.getOne(id);
  }
}
