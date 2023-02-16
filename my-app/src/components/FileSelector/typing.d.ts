declare namespace OneSIS {
    namespace Components {
        namespace FileSelector {
            type Props = {
                defaultPath?: string;
                mode?: SelectMode;
                single?: boolean;
                defaultViewType?: ViewType;
                height?: string | number;
                extensionsFilter?: string[];
                onSelectedChange?: (selected: any) => void;
            };

            type SelectMode =
                | 'File'
                | 'Folder'
                | 'All'

            type ViewType =
                | 'Card'
                | 'Table'
        }
    }
}
