const mockSalesPerSKU = async () => {
    const data = [
        {
            dataValues: {
                trans_so_dtls: {
                    dataValues: {
                        id: 12013,
                        so_no: 'PS-02259',
                        part_no: 'TS2GLH64V4B',
                        item_code: 3971,
                        item_name: 'Transcend',
                        item_desc: '16GB DDR4 2400MHZ U-DIMM 2RX8 1.2V',
                        qty: 30,
                        selling_price: '4300.00',
                        supplier_cost: '3250.00',
                        total_amount: '129000.00',
                        gp_amount: null,
                        gp_rate: '24.42',
                        include: 'Y',
                        start_date: '',
                        end_date: '',
                        contract_no: '',
                        serial_no: null,
                        sum_total: 123,
                        mast_item: {
                            mast_item_cats: [
                                {
                                    dataValues: {
                                        item_count: 123,
                                        cat_desc: '123'
                                    }
                                }
                            ]
                        }
                    },
                    dataValues: {
                        id: 12014,
                        so_no: 'PS-02259',
                        part_no: 'TS2GSH64V4B',
                        item_code: 3972,
                        item_name: 'Transcend',
                        item_desc: '16GB DDR4 2400MHZ SO-DIMM 2RX8 1.2V',
                        qty: 65,
                        selling_price: '4300.00',
                        supplier_cost: '3250.00',
                        total_amount: '279500.00',
                        gp_amount: null,
                        gp_rate: '24.42',
                        include: 'Y',
                        start_date: '',
                        end_date: '',
                        contract_no: '',
                        serial_no: null,
                        sum_total: 123,
                        mast_item: {
                            mast_item_cats: [
                                {
                                    dataValues: {
                                        item_count: 123,
                                        cat_desc: '123'
                                    }
                                }
                            ]
                        }
                    },
                    dataValues: {
                        id: 12015,
                        so_no: 'PS-02259',
                        part_no: 'TS512GMTE110S',
                        item_code: 3590,
                        item_name: 'Transcend',
                        item_desc: '512GB SSD (INTERNAL), M.2, PCIE, 2280 (3D TLC), DRAM LESS5 years limited warranty',
                        qty: 65,
                        selling_price: '2800.00',
                        supplier_cost: '2200.00',
                        total_amount: '182000.00',
                        gp_amount: null,
                        gp_rate: '21.43',
                        include: 'Y',
                        start_date: '',
                        end_date: '',
                        contract_no: '',
                        serial_no: null,
                        sum_total: 123,
                        mast_item: {
                            mast_item_cats: [
                                {
                                    dataValues: {
                                        item_count: 123,
                                        cat_desc: '123'
                                    }
                                }
                            ]
                        }
                    },
                    dataValues: {
                        id: 12016,
                        so_no: 'PS-02259',
                        part_no: 'TS1GLK64V6H',
                        item_code: 3973,
                        item_name: 'Transcend',
                        item_desc: 'DDR3 1600 U-DIMM 1Rx8 256Mx8 CL11 1.5V Lifetime 8GB',
                        qty: 20,
                        selling_price: '3000.00',
                        supplier_cost: '2300.00',
                        total_amount: '60000.00',
                        gp_amount: null,
                        gp_rate: '23.33',
                        include: 'Y',
                        start_date: '',
                        end_date: '',
                        contract_no: '',
                        serial_no: null,
                        sum_total: 123,
                        mast_item: {
                            mast_item_cats: [
                                {
                                    dataValues: {
                                        item_count: 123,
                                        cat_desc: '123'
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    ]
    return data
}

module.exports = {
    mockSalesPerSKU
}