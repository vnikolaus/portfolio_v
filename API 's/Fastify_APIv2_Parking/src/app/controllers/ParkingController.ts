import { FastifyAdapter } from "../../infra/http/FastifyAdapter";
import { ParkingRepositoryDatabase } from "../../infra/repositories/ParkingRepositoryDatabase";
import { Checkin } from "../useCases/Checkin";
import { Checkout } from "../useCases/Checkout";
import { DeleteCar } from "../useCases/DeleteCar";
import { GetCar } from "../useCases/GetCar";
import { optionsCheckin, optionsCheckout } from "./options/RouteOptions";

const fastify = new FastifyAdapter()
const parkingRepository = new ParkingRepositoryDatabase(fastify.app)

type DTO = {
  params: { [key: string]: string | number },
  query: { [key: string]: string | number },
  body: { [key: string]: string | number }
}

fastify.on('get', '/:id', {}, async ({ params }: DTO) => {
  const { id } = params
  const getCar = new GetCar(parkingRepository)
  const parkedCar =  await getCar.exec(id)
  return parkedCar
})

fastify.on('post', '/checkin', optionsCheckin, async ({ body }: DTO) => {
  const checkin = new Checkin(parkingRepository)
  const parkedCar = await checkin.exec(body.plate)
  return parkedCar
})

fastify.on('post', '/checkout/:id', optionsCheckout, async ({ params }: DTO) => {
  const { id } = params
  const checkout = new Checkout(parkingRepository)
  const checkoutedCar = await checkout.exec(id)
  return checkoutedCar
})

fastify.on('delete', '/:id', {}, async ({ params }: DTO) => {
  const { id } = params
  const deleteCar = new DeleteCar(parkingRepository)
  await deleteCar.exec(id)
  return { deleted: id }
})

export { fastify, parkingRepository };
