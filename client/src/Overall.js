import React from 'react';
import PropTypes from 'prop-types';
import CandidateCard from './CandidateCard';
import { getCandidateName } from './utils';

class Overall extends React.Component {
    render() {
        var { data } = this.props;
        data.percentages = {};

        var total = Object.keys(data.results).reduce((t, i) => t + data.results[i], 0);

        Object.keys(data.results).forEach(k => {
            data.percentages[k] = data.results[k] / total;
        });

        return (
            <div className="chart">
                <CandidateCard name={getCandidateName('mi')} count={data.results.mi} percentage={data.percentages.mi} />
                <CandidateCard name={getCandidateName('ma')} count={data.results.ma} percentage={data.percentages.ma} />
                <CandidateCard name={getCandidateName('tk')} count={data.results.tk} percentage={data.percentages.tk} />
                <CandidateCard name={getCandidateName('rte')} count={data.results.rte} percentage={data.percentages.rte} />
                <CandidateCard name={getCandidateName('dp')} count={data.results.dp} percentage={data.percentages.dp} />
                <CandidateCard name={getCandidateName('sd')} count={data.results.sd} percentage={data.percentages.sd} />
            </div>
        );
    }
}

Overall.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Overall;

