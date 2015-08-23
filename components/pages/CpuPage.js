import React from 'react';
import ProccessManager from 'current-processes';
import _ from 'lodash';

const CpuPage = React.createClass({
    getInitialState() {
        return {
            processes: []
        };
    },

    componentDidMount() {
        ProccessManager.get(function (err, processes) {
            var sorted = _.sortBy(processes, 'cpu');
            var top5  = processes.reverse().splice(0, 100);

            if (this.isMounted()) {
                this.setState({processes: processes});
            }
        }.bind(this));
    },

    render() {
        var processes = this.state.processes;
        if (processes.length == 0) {
            return <div>Fetching...</div>;
        }

        var processList = processes.map(function (process) {
            return <div>{process.name} {process.cpu} {process.pid}</div>;
        });

        return (
            <div>
                <div>Cpu Page</div>
                {processList}
            </div>
        );
    }
});

export default CpuPage;