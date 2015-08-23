import React from 'react';
import { Table, striped, bordered, condensed, hover } from 'react-bootstrap';
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

        var processList = processes.map(process => {
            return <tr>
                <td>{process.pid}</td>
                <td>{process.name}</td>
                <td>{process.cpu}</td>
            </tr>;
        });

        return (
            <div className="page">
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>CPU</th>
                    </tr>
                    </thead>
                    <tbody>
                    {processList}
                    </tbody>
                </Table>
            </div>
        );
    }
});

export default CpuPage;