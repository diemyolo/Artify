import React, { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar'
import { Table } from 'flowbite-react';

const RequestHistory = () => {

    return (
        <div className='w-full h-screen bg-gray-100'>
            <NavBar />
            <div className='h-screen p-28 mt-5'>
                <h1 className='text-center text-3xl font-semibold mb-10'>Request History</h1>
                <div className="overflow-x-auto">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>Audience Information</Table.HeadCell>
                            <Table.HeadCell>Creator</Table.HeadCell>
                            <Table.HeadCell>Pre-order Date</Table.HeadCell>
                            <Table.HeadCell>Requirement</Table.HeadCell>
                            <Table.HeadCell>Price</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Artwork</Table.HeadCell>
                            <Table.HeadCell>Creator Note</Table.HeadCell>
                            <Table.HeadCell>Audience Feedback</Table.HeadCell>
                            <Table.HeadCell>Audience Rating</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Cancel</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {'Apple MacBook Pro 17"'}
                                </Table.Cell>
                                <Table.Cell>Sliver</Table.Cell>
                                <Table.Cell>Laptop</Table.Cell>
                                <Table.Cell>$2999</Table.Cell>
                                <Table.Cell>$2999</Table.Cell>
                                <Table.Cell>$2999</Table.Cell>
                                <Table.Cell>$2999</Table.Cell>
                                <Table.Cell>$2999</Table.Cell>
                                <Table.Cell>$2999</Table.Cell>
                                <Table.Cell>$2999</Table.Cell>
                                <Table.Cell>
                                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Cancel
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                           
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default RequestHistory