const { STAGE1, STAGE2, STAGE3 } = require('./constants')

const valueExist = (value) => {
    return value !== undefined && value !== null && value !== '';
}

const getStages = (data) => {
    if (Array.isArray(data)) {
        const temp = data[0]

        const newStage = temp
            .filter(item => item.stage_code == STAGE1 && !item.win_date && !item.lost_date)
            .map(item => parseFloat(item.total_amount))
            .reduce((acc, val) => acc + val, 0);

        const wipStage = temp
            .filter(item => item.stage_code == STAGE2 && !item.win_date && !item.lost_date)
            .map(item => parseFloat(item.total_amount))
            .reduce((acc, val) => acc + val, 0);

        const commitmentStage = temp
            .filter(item => item.stage_code == STAGE3 && !item.win_date && !item.lost_date)
            .map(item => parseFloat(item.total_amount))
            .reduce((acc, val) => acc + val, 0);

        const winStage = temp
            .filter(item => valueExist(item.win_date))
            .map(item => parseFloat(item.total_amount))
            .reduce((acc, val) => acc + val, 0);

        const lostStage = temp
            .filter(item => valueExist(item.lost_date))
            .map(item => parseFloat(item.total_amount))
            .reduce((acc, val) => acc + val, 0);

        const result = {
            newStage: {
                count: temp.filter(item => item.stage_code == STAGE1 && !item.win_date && !item.lost_date).length,
                total: newStage,
                title: 'NEW',
                icon: 'create_new_folder',
                class: 'card-header-warning',
                color: '#00bcd4',
            },
            wipStage: {
                count: temp.filter(item => item.stage_code == STAGE2 && !item.win_date && !item.lost_date).length,
                total: wipStage,
                title: 'WORK IN PROGRESS',
                icon: 'schedule',
                class: 'card-header-rose',
                color: '#ff9800',
            },
            commitmentStage: {
                count: temp.filter(item => item.stage_code == STAGE3 && !item.win_date && !item.lost_date).length,
                total: commitmentStage,
                title: 'COMMITMENT',
                icon: 'date_range',
                class: 'card-header-info',
                color: '#f4c63d',
            },
            winStage: {
                count: temp.filter(item => valueExist(item.win_date)).length,
                total: winStage,
                title: 'WON',
                icon: 'emoji_events',
                class: 'card-header-success',
                color: '#66bb6a',
            },
            lostStage: {
                count: temp.filter(item => valueExist(item.lost_date)).length,
                total: lostStage,
                title: 'LOST',
                icon: 'report_off',
                class: 'card-header-danger',
                color: '#c95050',
            },
        }

        return result
    } else {
        return data
    }

}

const getProducts = (data) => {
    if (Array.isArray(data)) {
        const tempData = data[0]

        // Grouping items by cat_desc
        const groupedByCatDesc = tempData.reduce((acc, item) => {
            const { cat_desc, color } = item;

            const title = cat_desc !== null ? cat_desc : "Unknown";
            const newColor = cat_desc !== null ? color : "#0f0f0f";

            if (!acc[title]) {
                acc[title] = { title, color: newColor, count: 1 };
            } else {
                acc[title].count++;
            }
            return acc;
        }, {});

        const result = Object.values(groupedByCatDesc);

        return result
    } else {
        return data
    }
}

const getProductPerType = (data) => {
    if (Array.isArray(data)) {
        const tempData = data[0]

        // Grouping items by cat_desc
        const groupedData = tempData.reduce((acc, item) => {
            if (item.cat_desc) {
                if (!acc[item.cat_desc]) {
                    acc[item.cat_desc] = { win_count: 0, lost_count: 0, commitment_count: 0, wip_count: 0, new_count: 0 };
                }
                if (item.win_date && item.win_date !== null && item.win_date !== '') {
                    acc[item.cat_desc].win_count++;
                }
                if (item.lost_date && item.lost_date !== null && item.lost_date !== '') {
                    acc[item.cat_desc].lost_count++;
                }
                if (item.stage_code == STAGE3 && !item.win_date && !item.lost_date) {
                    acc[item.cat_desc].commitment_count++;
                }
                if (item.stage_code == STAGE2 && !item.win_date && !item.lost_date) {
                    acc[item.cat_desc].wip_count++;
                }
                if (item.stage_code == STAGE1 && !item.win_date && !item.lost_date) {
                    acc[item.cat_desc].new_count++;
                }
            }
            return acc;
        }, {});


        const result = Object.entries(groupedData).map(([cat_desc, counts]) => ({ [cat_desc]: counts }));
        console.log(result);

        return result
    } else {
        return data
    }
}

module.exports = {
    getStages,
    getProducts,
    getProductPerType
}