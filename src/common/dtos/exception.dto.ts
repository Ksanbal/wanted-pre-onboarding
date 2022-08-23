import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionDto {
  @ApiProperty({
    example: '에러 메세지',
    description: '에러 메세지',
  })
  message: string;

  @ApiProperty()
  data: object;
}
