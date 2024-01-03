export const optionsCheckin: RouteOptions = {
    schema: { 
        body: { 
            type: 'object',
            required: ['plate'],
            properties: {
                plate: { type: 'string' },
            }
        }
    }
}

export const optionsCheckout: RouteOptions = {
    schema: { 
        params: { 
            type: 'object',
            required: ['id'],
            properties: {
                id: { type: 'number' },
            }
        }
    }
}