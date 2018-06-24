import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { format } from './utils';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: 0,
        overflowX: 'auto'
    },
    table: {
        minWidth: 700,
    },
});

function ResultsTable(props) {
    const { classes, data } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Il</TableCell>
                        <TableCell numeric>Sandik</TableCell>
                        <TableCell numeric>Acilan</TableCell>
                        <TableCell numeric>Secmen</TableCell>
                        <TableCell numeric>Oy Kullanan</TableCell>
                        <TableCell numeric>Ince</TableCell>
                        <TableCell numeric>Aksener</TableCell>
                        <TableCell numeric>Karamollaoglu</TableCell>
                        <TableCell numeric>Erdogan</TableCell>
                        <TableCell numeric>Perincek</TableCell>
                        <TableCell numeric>Demirtas</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(n => {
                        return (
                            <TableRow key={n.id}>
                                <TableCell component="th" scope="row">
                                    {n.name}
                                </TableCell>
                                <TableCell numeric>{format(n.box_count)}</TableCell>
                                <TableCell numeric>{format(n.open_box_count)}</TableCell>
                                <TableCell numeric>{format(n.voter_count)}</TableCell>
                                <TableCell numeric>{format(n.total_valid_vote)}</TableCell>
                                <TableCell numeric>{format(n.results.mi)}</TableCell>
                                <TableCell numeric>{format(n.results.ma)}</TableCell>
                                <TableCell numeric>{format(n.results.tk)}</TableCell>
                                <TableCell numeric>{format(n.results.rte)}</TableCell>
                                <TableCell numeric>{format(n.results.dp)}</TableCell>
                                <TableCell numeric>{format(n.results.sd)}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

ResultsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultsTable);