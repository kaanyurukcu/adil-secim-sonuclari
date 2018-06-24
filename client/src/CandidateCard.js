import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { format } from './utils';

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

function CandidateCard(props) {
    const { name, count, percentage } = props;

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        {name}
                    </Typography>
                    <Typography color="textSecondary" className="count">
                        {format(count)}
                    </Typography>
                    <Typography color="textSecondary" className="percentage">
                        %{format(percentage * 100)}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

CandidateCard.propTypes = {
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired
};

export default withStyles(styles)(CandidateCard);