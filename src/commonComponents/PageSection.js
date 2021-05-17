import { Paper } from "@material-ui/core";

export default function PageSection({ children }) {
    return (
        <div className="page-section">
            <Paper className="wrapper">
                {children}
            </Paper>
        </div>
    )
}
