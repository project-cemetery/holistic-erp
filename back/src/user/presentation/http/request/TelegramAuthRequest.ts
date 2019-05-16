import { ApiModelProperty } from '@nestjs/swagger'

export class TelegramAuthRequest {
  @ApiModelProperty({ example: 65400792 })
  public readonly id: number

  @ApiModelProperty({ example: 'Igor' })
  public readonly first_name: string

  @ApiModelProperty({ example: 'Kamyshev' })
  public readonly last_name: string

  @ApiModelProperty({ example: 'igorkamyshev' })
  public readonly username: string

  // ??
  @ApiModelProperty({ example: 'igorkamyshev' })
  public readonly photo_url: string

  @ApiModelProperty({ example: 1557951994 })
  public readonly auth_date: number

  @ApiModelProperty({
    example: '716c60eda387442be92cd6146bffbecc22032b3b5636374e60a1af86dfaa5f00',
  })
  public readonly hash: string
}