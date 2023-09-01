import { DB } from "../../infra/database/db";
import { ParkingRepository } from "./parking.repository";

const database = new DB()
const parkingRepository = new ParkingRepository(database)

export { parkingRepository }