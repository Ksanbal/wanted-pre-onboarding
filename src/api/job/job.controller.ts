import { JobApplyDto } from './dtos/job-apply.dto';
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
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobCreateDto } from './dtos/job-create.dto';
import { JobListDto } from './dtos/job-list.dto';
import { JobDto } from './dtos/job.dto';
import { JobService } from './job.service';
import { JobListQueryDto } from './dtos/job-list-query.dto';

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
    type: [JobListDto],
  })
  async getList(@Query() query: JobListQueryDto) {
    return this.jobService.getList(query);
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

  @Post(':id/apply')
  @ApiOperation({ summary: '채용공고 지원' })
  @ApiResponse({
    status: 201,
  })
  @ApiResponse({
    status: 202,
    description: '이미 지원하였습니다.',
    type: HttpExceptionDto,
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
  async apply(
    @Param('id', ParseIntPipe) id: number,
    @Body() applyDto: JobApplyDto,
  ) {
    return this.jobService.apply(id, applyDto);
  }
}
