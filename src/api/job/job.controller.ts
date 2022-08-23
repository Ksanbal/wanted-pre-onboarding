import { JobPatchDto } from './dtos/job-patch.dto';
import { HttpExceptionDto } from './../../common/dtos/exception.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
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

  @Patch(':id')
  @ApiOperation({ summary: '채용공고 수정' })
  @ApiResponse({
    status: 200,
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
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchDto: JobPatchDto,
  ) {
    return this.jobService.patchOne(id, patchDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: '채용공고 삭제' })
  @ApiResponse({
    status: 204,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: HttpExceptionDto,
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.jobService.deleteOne(id);
  }
}
