import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createMpesaTransaction(data) {
    try {
        const transaction = await prisma.mpesaTransaction.create({
            data
        });
        return transaction;
    } catch (error) {
        console.error('Error creating M-Pesa transaction:', error);
        throw new Error('Failed to create M-Pesa transaction');
    }
}

export async function updateMpesaTransaction(id, data) {
    try {
        const transaction = await prisma.mpesaTransaction.update({
            where: { id },
            data
        });
        return transaction;
    } catch (error) {
        console.error('Error updating M-Pesa transaction:', error);
        throw new Error('Failed to update M-Pesa transaction');
    }
}

export async function getMpesaTransaction(id) {
    try {
        const transaction = await prisma.mpesaTransaction.findUnique({
            where: { id }
        });
        return transaction;
    } catch (error) {
        console.error('Error getting M-Pesa transaction:', error);
        throw new Error('Failed to get M-Pesa transaction');
    }
}