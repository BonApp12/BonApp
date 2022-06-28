import * as dayjs from 'dayjs'

export const orderVariable = (order) => {
    return {
        fullname: order.user.firstname + " " + order.user.lastname,
        email: order.user.email,
        plates: order.orderPlates.map(orderPlate => {
            return {
                name: orderPlate.plate.name,
                type: orderPlate.plate.type,
                price: orderPlate.price,
                quantity: orderPlate.quantity
            }
        }),
        date: dayjs(order.updated_at).format('DD/MM/YYYY à HH:mm'),
        numInvoice: order.id.toString(),
        companyName: order.restaurant.name,
        companySiren: order.restaurant.siren,
        companyAddress: 'N/A',
        companyPhone: order.restaurant.contact_phone,
        companyEmail: order.restaurant.contact_email,
    }
}