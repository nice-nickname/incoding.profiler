import Actions from "@devtools/models/actions";

const actionColors: { [key in Actions]: string } = {
    'Direct': 'rgb(238, 238, 238)',
    'Eval': 'rgb(243, 147, 147)',
    'Ajax': 'rgb(144, 188, 253)',
    'Submit': 'rgb(144, 188, 253)',
    'Jquery': 'rgb(183, 245, 150)',
    'Trigger': 'rgb(247, 255, 139)',
    'Insert': 'rgb(247, 255, 139)',
    'Eval Method': 'rgb(243, 147, 147)',
    'Break': 'rgb(238, 238, 238)',
    'Store Insert': 'rgb(238, 238, 238)',
    'Store fetch': 'rgb(238, 238, 238)',
    'Store Manipulate': 'rgb(238, 238, 238)',
    'Form': 'rgb(238, 238, 238)',
    'Bind': 'rgb(238, 238, 238)',
    'Validation parse': 'rgb(238, 238, 238)',
    'Validation Refresh': 'rgb(238, 238, 238)',
}

export default function getColorByAction(action: Actions) {
    return actionColors[action]
}
