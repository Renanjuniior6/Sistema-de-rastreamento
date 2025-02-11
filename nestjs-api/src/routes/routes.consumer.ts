/* eslint-disable prettier/prettier */
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { KafkaContext } from 'src/kafka/kafka-context';
import { RoutesService } from './routes.service';

@Controller()
export class RoutesConsumer {
  private logger = new Logger(RoutesConsumer.name);

  constructor(private routeService: RoutesService) {}

  @MessagePattern('freight')
  async updateFreight(payload: KafkaContext) {
    this.logger.log(
      `Receiveing message from topic ${payload.messageValue}`,
      payload.messageValue,
    );
    const { route_id, amount } = payload.messageValue;

    await this.routeService.update(route_id, { freight: amount });
  }
}
