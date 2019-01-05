import { NestFactory } from '@nestjs/core'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import { ValidationPipe } from 'Pipes/Validation/Validation.pipe'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.use(helmet())
  app.use(morgan('dev'))

  app.setGlobalPrefix('api')
  await app.listen(3009)
  console.log('====== Listening at port 3009 ======')
}
bootstrap()
