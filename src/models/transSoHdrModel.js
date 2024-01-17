module.exports = (sequelize, DataTypes) => {
    const trans_so_hdr = sequelize.define('trans_so_hdr', {
        // id: {
        //     type: DataTypes.STRING,
        //     primaryKey: true,
        //     autoIncrement: true
        // },

        // In database, id is the actual primary key
        so_no: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        so_date: {
            type: DataTypes.STRING
        },
        ctrl_no: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        prop_no: {
            type: DataTypes.STRING
        },
        prop_date: {
            type: DataTypes.STRING
        },
        customer_name: {
            type: DataTypes.STRING
        },
        cust_code: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        ship_id: {
            type: DataTypes.INTEGER
        },
        ship_branch: {
            type: DataTypes.STRING
        },
        ship_address: {
            type: DataTypes.STRING
        },
        contact_id: {
            type: DataTypes.INTEGER
        },
        contact_person: {
            type: DataTypes.STRING
        },
        contact_no: {
            type: DataTypes.STRING
        },
        account_mngr: {
            type: DataTypes.STRING
        },
        manager_code: {
            type: DataTypes.STRING
        },
        tin_no: {
            type: DataTypes.STRING
        },
        vat_type: {
            type: DataTypes.STRING
        },
        po_no: {
            type: DataTypes.STRING
        },
        terms: {
            type: DataTypes.STRING
        },
        grand_total: {
            type: DataTypes.FLOAT(17, 2)
        },
        created_by: {
            type: DataTypes.STRING
        },
        created_date: {
            type: DataTypes.STRING
        },
        submit_by: {
            type: DataTypes.STRING
        },
        submit_date: {
            type: DataTypes.STRING
        },
        submit_note: {
            type: DataTypes.STRING
        },
        last_edit_by: {
            type: DataTypes.STRING
        },
        last_edit_date: {
            type: DataTypes.STRING
        },
        cancel_by: {
            type: DataTypes.STRING
        },
        cancel_date: {
            type: DataTypes.STRING
        },
        cancel_note: {
            type: DataTypes.STRING
        },
        review_by: {
            type: DataTypes.STRING
        },
        review_date: {
            type: DataTypes.STRING
        },
        review_signature: {
            type: DataTypes.STRING
        },
        rev_return_by: {
            type: DataTypes.STRING
        },
        rev_return_date: {
            type: DataTypes.STRING
        },
        rev_return_note: {
            type: DataTypes.STRING
        },
        approve_by: {
            type: DataTypes.STRING
        },
        approve_date: {
            type: DataTypes.STRING
        },
        approve_note: {
            type: DataTypes.STRING
        },
        app_return_by: {
            type: DataTypes.STRING
        },
        app_return_date: {
            type: DataTypes.STRING
        },
        app_return_note: {
            type: DataTypes.STRING
        },
        print_stat: {
            type: DataTypes.STRING
        },
        print_date: {
            type: DataTypes.STRING
        },
        print_by: {
            type: DataTypes.STRING
        },
        vat_amount: {
            type: DataTypes.FLOAT(17, 2),
            defaultValue: 0.0
        },
        total_amount: {
            type: DataTypes.FLOAT(17, 2),
            defaultValue: 0.0
        },
        warranty: {
            type: DataTypes.STRING
        },
        remarks: {
            type: DataTypes.STRING
        },
        attachment: {
            type: DataTypes.STRING
        },
        r_type: {
            type: DataTypes.STRING
        },
        recall_by: {
            type: DataTypes.STRING
        },
        recall_date: {
            type: DataTypes.DATE
        },
        recall_note: {
            type: DataTypes.STRING
        },
        approved_by_pres: {
            type: DataTypes.STRING
        },
        approved_by_pres_date: {
            type: DataTypes.STRING
        },
        approved_by_pres_id: {
            type: DataTypes.STRING
        },
        other_expenses: {
            type: DataTypes.FLOAT(17, 2),
            defaultValue: 0.0
        },
        total_php: {
            type: DataTypes.FLOAT(17, 2),
            defaultValue: 0.0
        },
        fx_rate: {
            type: DataTypes.FLOAT(17, 2),
            defaultValue: 0.0
        },
        currency: {
            type: DataTypes.STRING
        },
        multiple_prop_no: {
            type: DataTypes.STRING
        }
    })

    return trans_so_hdr
}
