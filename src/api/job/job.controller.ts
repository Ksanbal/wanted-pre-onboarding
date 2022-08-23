import { HttpExceptionDto } from './../../common/dtos/exception.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsNumber, isNumber } from 'class-validator';
import { JobCreateDto } from './dtos/job-create.dto';
import { JobListDto } from './dtos/job-list.dto';
import { JobDto } from './dtos/job.dto';
import { JobService } from './job.service';

@ApiTags('job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiOperation({ summary: '채용공고 등록' })
  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: HttpExceptionDto,
  })
  async create(@Body() createDto: JobCreateDto) {
    return this.jobService.create(createDto);
  }

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
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: HttpExceptionDto,
  })
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.jobService.getOne(id);
  }
}
