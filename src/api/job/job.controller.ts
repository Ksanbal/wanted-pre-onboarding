import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobDto } from './dtos/job.dto';
import { JobService } from './job.service';

@ApiTags('job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @Get()
  @ApiOperation({ summary: '채용공고 리스트' })
  @ApiResponse({
    status: 200,
    type: JobDto,
  })
  async getList(): Promise<JobDto[]> {
    return this.jobService.getList();
  }
}
