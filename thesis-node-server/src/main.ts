import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from 'Pipes/Validation/Validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3009)
  console.log('====== Listening at port 3009 ======')
}
bootstrap()
